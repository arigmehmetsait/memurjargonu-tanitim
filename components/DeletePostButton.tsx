"use client";

import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeletePostButtonProps {
  postId: string;
  postTitle: string;
  variant?: "outline-danger" | "danger";
  size?: "sm" | "lg";
  className?: string;
}

export function DeletePostButton({
  postId,
  postTitle,
  variant = "outline-danger",
  size,
  className = "",
}: DeletePostButtonProps) {
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        window.location.href = "/admin/blog";
      } else {
        const data = await res.json().catch(() => ({}));
        setShow(false);
        alert(data.error || "Yazı silinemedi");
      }
    } catch {
      setShow(false);
      alert("Yazı silinemedi");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setShow(true)}
        disabled={deleting}
        title="Yazıyı sil"
        aria-label="Yazıyı sil"
      >
        <Trash2 size={16} className="me-1" />
      </Button>

      <Modal show={show} onHide={() => !deleting && setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            <span
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: 40,
                height: 40,
                background: "rgba(220, 53, 69, 0.15)",
                color: "#dc3545",
              }}
            >
              <AlertTriangle size={22} />
            </span>
            Yazıyı Sil
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            <strong>&quot;{postTitle}&quot;</strong> yazısını silmek istediğinize emin misiniz? Bu işlem
            geri alınamaz.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShow(false)} disabled={deleting}>
            İptal
          </Button>
          <Button variant="danger" onClick={handleConfirm} disabled={deleting}>
            {deleting ? "Siliniyor..." : "Sil"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
