const API_URL = "https://pindai-hackathon-api.vercel.app/api/submit";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("hackathon-form");
    const submitBtn = document.getElementById("submit-btn");
    const submitBtnText = document.getElementById("submit-btn-text");
    const messageBox = document.getElementById("form-message");
    const fileInput = document.getElementById("file_html");
    const fileChosenName = document.getElementById("file-chosen-name");
    const fileLabel = document.querySelector(".file-input-label");

    // Tampilkan nama file yang dipilih
    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            fileChosenName.textContent = fileInput.files[0].name;
            fileLabel.classList.add("has-file");
        } else {
            fileChosenName.textContent = "Pilih file .html";
            fileLabel.classList.remove("has-file");
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearMessage();

        // Validasi dasar di sisi klien
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const file = fileInput.files[0];
        if (!file) {
            showMessage("Pilih file proyek HTML terlebih dahulu.", "error");
            return;
        }

        const allowedExt = [".html", ".htm"];
        const isValidExt = allowedExt.some((ext) => file.name.toLowerCase().endsWith(ext));
        if (!isValidExt) {
            showMessage("File harus berformat .html atau .htm", "error");
            return;
        }

        const maxSizeBytes = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSizeBytes) {
            showMessage("Ukuran file maksimal 5MB.", "error");
            return;
        }

        setLoading(true);

        try {
            // Baca isi file HTML sebagai String Teks
            const htmlContent = await file.text();

            // Ambil elemen form berdasarkan atribut name
            const fullNameVal = form.querySelector('[name="full_name"]')?.value || form.querySelector('[name="fullName"]')?.value || "";
            const emailVal = form.querySelector('[name="email"]')?.value || "";
            const institutionVal = form.querySelector('[name="institution"]')?.value || "";
            const projectTitleVal = form.querySelector('[name="project_title"]')?.value || form.querySelector('[name="projectTitle"]')?.value || "";

            // Payload disesuaikan dengan key snake_case dan camelCase agar cocok dengan backend
            const payload = {
                full_name: fullNameVal,
                fullName: fullNameVal,
                email: emailVal,
                institution: institutionVal,
                project_title: projectTitleVal,
                projectTitle: projectTitleVal,
                html_content: htmlContent,
                htmlContent: htmlContent
            };

            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                showMessage(data.error || "Terjadi kesalahan. Silakan coba lagi.", "error");
                return;
            }

            showMessage(
                "Proyek berhasil dikirim! Cek email kamu untuk konfirmasi.",
                "success"
            );
            form.reset();
            fileChosenName.textContent = "Pilih file .html";
            fileLabel.classList.remove("has-file");
        } catch (err) {
            console.error(err);
            showMessage(
                "Gagal terhubung ke server. Periksa koneksi internet kamu dan coba lagi.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    });

    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        submitBtnText.textContent = isLoading ? "Mengirim..." : "Kirim Proyek";
    }

    function showMessage(text, type) {
        messageBox.textContent = text;
        messageBox.className = "form-message " + type;
    }

    function clearMessage() {
        messageBox.textContent = "";
        messageBox.className = "form-message";
    }
});
