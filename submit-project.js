const API_URL = "https://pindai-hackathon-api.vercel.app/api/submit";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("hackathon-form");
    const submitBtn = document.getElementById("submit-btn");
    const submitBtnText = document.getElementById("submit-btn-text");
    const messageBox = document.getElementById("form-message");
    const fileInput = document.getElementById("file_html");
    const fileChosenName = document.getElementById("file-chosen-name");
    const fileLabel = document.querySelector(".file-input-label");

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

        const file = fileInput.files[0];
        if (!file) {
            showMessage("Pilih file proyek HTML terlebih dahulu.", "error");
            return;
        }

        const formData = new FormData();
        
        // Ambil elemen berdasarkan atribut name atau ID
        const getVal = (selector) => form.querySelector(selector)?.value || "";

        formData.append("nama", getVal('[name="nama"]') || getVal('[name="full_name"]'));
        formData.append("email", getVal('[name="email"]'));
        formData.append("no_wa", getVal('[name="no_wa"]') || getVal('[name="whatsapp"]') || "08123456789"); // Default fallback jika input WA tidak ada di HTML
        formData.append("instansi", getVal('[name="instansi"]') || getVal('[name="institution"]'));
        formData.append("judul_proyek", getVal('[name="judul_proyek"]') || getVal('[name="project_title"]'));
        formData.append("file_html", file);

        setLoading(true);

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                showMessage(data.error || "Terjadi kesalahan. Silakan coba lagi.", "error");
                return;
            }

            showMessage("Proyek berhasil dikirim! Cek email kamu untuk konfirmasi.", "success");
            form.reset();
            fileChosenName.textContent = "Pilih file .html";
            fileLabel.classList.remove("has-file");
        } catch (err) {
            console.error(err);
            showMessage("Gagal terhubung ke server. Periksa koneksi internet kamu.", "error");
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
