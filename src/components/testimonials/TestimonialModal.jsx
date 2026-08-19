"use client";
import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import StarRating from "./StarRating";
export default function TestimonialModal({ open, onClose, onCreated }) { const [rating, setRating] = useState(5); const [saving, setSaving] = useState(false); async function submit(event) { event.preventDefault(); setSaving(true); const form = new FormData(event.currentTarget); const response = await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name"), role: form.get("role"), quote: form.get("quote"), rating }) }); setSaving(false); if (response.ok) { onCreated?.(await response.json()); onClose(); } } return <Modal open={open} title="Add a review" onClose={onClose}><form onSubmit={submit} className="space-y-4"><Input name="name" placeholder="Your name" required /><Input name="role" placeholder="Role or company (optional)" /><textarea name="quote" required placeholder="Your review" className="min-h-28 w-full rounded-md border border-stone-300 p-3" /><StarRating value={rating} onChange={setRating} /><Button disabled={saving}>{saving ? "Sending…" : "Submit review"}</Button></form></Modal>; }
