"use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";

const { TextArea } = Input;

interface ContactFormValues {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

interface ContactFormProps {
  togglePanel: () => void;
}

export default function ContactForm({ togglePanel }: ContactFormProps) {
  const [form] = Form.useForm<ContactFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Votre message a été envoyé avec succès !");
        form.resetFields();
        // Légère attente pour laisser l'utilisateur voir le succès avant de fermer
        setTimeout(() => {
          togglePanel();
        }, 500);
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      message.error(
        "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-auto w-full lg:max-w-7xl mx-auto space-y-8">
      {/* En-tête du Formulaire */}
      <div className="flex justify-center items-center pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="text-center">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Contactez-nous
          </h2>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-4">
            Une idée ? Un projet ? Parlons-en ensemble.
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-8 w-full">
        {/* Formulaire Ant Design */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              label={
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Nom
                </span>
              }
              name="nom"
              rules={[{ required: true, message: "Veuillez entrer votre nom" }]}
              className="mb-0"
            >
              <Input
                placeholder="Votre nom complet"
                className="h-11 rounded-xl border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-600 focus:border-amber-500 hover:border-amber-500"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Email
                </span>
              }
              name="email"
              rules={[
                { required: true, message: "Veuillez entrer votre email" },
                { type: "email", message: "Email invalide" },
              ]}
              className="mb-0"
            >
              <Input
                placeholder="adresse@exemple.com"
                className="h-11 rounded-xl border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-600 focus:border-amber-500 hover:border-amber-500"
              />
            </Form.Item>
          </div>

          <Form.Item
            label={
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Sujet
              </span>
            }
            name="sujet"
            rules={[{ required: true, message: "Veuillez entrer un sujet" }]}
          >
            <Input
              placeholder="Quel est l'objet de votre message ?"
              className="h-11 rounded-xl border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-600 focus:border-amber-500 hover:border-amber-500"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Message
              </span>
            }
            name="message"
            rules={[
              { required: true, message: "Veuillez saisir votre message" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Décrivez votre besoin en quelques lignes..."
              className="rounded-xl border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-600 focus:border-amber-500 hover:border-amber-500 py-3"
            />
          </Form.Item>

          <Form.Item className="pt-2 mb-0">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isSubmitting}
              className="h-12 bg-amber-500 hover:bg-amber-600 border-none rounded-xl font-semibold shadow-md shadow-amber-500/10 transition-all text-sm"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
            </Button>
          </Form.Item>
        </Form>

        {/* Informations de contact et carte interactive */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="w-full max-w-xl h-full"
        >
          <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-2 border border-zinc-200/60 dark:border-zinc-900 shadow-inner grow overflow-hidden relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.7946973873496!2d15.3255146!3d-4.374828!2m3!1f0!2f0!3f0!3m2!1i1020!1i768!4f13.1!3m3!1m2!1s0x1a6a369fa8943899%3A0x6b405f6eec3b5e4c!2sRighini%2C%20Kinshasa!5e0!3m2!1sfr!2scd!4v1710000000000!5m2!1sfr!2scd"
              width="100%"
              height="100%"
              className="rounded-xl min-h-60 grayscale hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>

            <div className="absolute bottom-6 left-6 right-6">
              <a
                href="https://maps.google.com/?q=Righini,Lemba,Kinshasa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-5 py-3.5 rounded-xl flex items-center justify-between shadow-xl hover:bg-white dark:hover:bg-zinc-900 transition-colors border border-white/20 dark:border-zinc-800"
              >
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                    Notre Bureau
                  </p>
                  <p className="text-zinc-800 dark:text-zinc-200 font-medium text-xs sm:text-sm">
                    Righini, Lemba, Kinshasa, RD Congo
                  </p>
                </div>
                <div className="bg-amber-500 p-2 rounded-lg text-white shadow-md shadow-amber-500/20">
                  <FaEye size={16} />
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


/**
 * "use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";

const { TextArea } = Input;

interface ContactFormValues {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

interface ContactFormProps {
  togglePanel: () => void;
}

export default function ContactForm({ togglePanel }: ContactFormProps) {
  const [form] = Form.useForm<ContactFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Votre message a été envoyé avec succès !");
        form.resetFields();
        // Légère attente pour laisser l'utilisateur voir le succès avant de fermer
        setTimeout(() => {
          togglePanel();
        }, 500);
      } else {
        throw new Error("Erreur serveur");
      }
    } catch (error) {
      message.error(
        "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
        <div>
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Contactez-nous
          </h2>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-4">
            Une idée ? Un projet ? Parlons-en ensemble.
          </p>
        </div>
        <button
          onClick={togglePanel}
          className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all focus:outline-none"
          type="button"
          aria-label="Fermer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex gap-8">
      {/* Formulaire Ant Design *//*}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item
            label={
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Nom
              </span>
            }
            name="nom"
            rules={[{ required: true, message: "Veuillez entrer votre nom" }]}
            className="mb-0"
          >
            <Input
              placeholder="Votre nom complet"
              className="h-11 rounded-xl border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-600 focus:border-amber-500 hover:border-amber-500"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Email
              </span>
            }
            name="email"
            rules={[
              { required: true, message: "Veuillez entrer votre email" },
              { type: "email", message: "Email invalide" },
            ]}
            className="mb-0"
          >
            <Input
              placeholder="adresse@exemple.com"
              className="h-11 rounded-xl border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-600 focus:border-amber-500 hover:border-amber-500"
            />
          </Form.Item>
        </div>

        <Form.Item
          label={
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Sujet
            </span>
          }
          name="sujet"
          rules={[{ required: true, message: "Veuillez entrer un sujet" }]}
        >
          <Input
            placeholder="Quel est l'objet de votre message ?"
            className="h-11 rounded-xl border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-600 focus:border-amber-500 hover:border-amber-500"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Message
            </span>
          }
          name="message"
          rules={[{ required: true, message: "Veuillez saisir votre message" }]}
        >
          <TextArea
            rows={4}
            placeholder="Décrivez votre besoin en quelques lignes..."
            className="rounded-xl border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:placeholder-zinc-600 focus:border-amber-500 hover:border-amber-500 py-3"
          />
        </Form.Item>

        <Form.Item className="pt-2 mb-0">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isSubmitting}
            className="h-12 bg-amber-500 hover:bg-amber-600 border-none rounded-xl font-semibold shadow-md shadow-amber-500/10 transition-all text-sm"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </Button>
        </Form.Item>
      </Form>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-2 border border-zinc-200/60 dark:border-zinc-900 shadow-inner grow overflow-hidden relative group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.7946973873496!2d15.3255146!3d-4.374828!2m3!1f0!2f0!3f0!3m2!1i1020!1i768!4f13.1!3m3!1m2!1s0x1a6a369fa8943899%3A0x6b405f6eec3b5e4c!2sRighini%2C%20Kinshasa!5e0!3m2!1sfr!2scd!4v1710000000000!5m2!1sfr!2scd"
            width="100%"
            height="100%"
            className="rounded-xl min-h-60 grayscale hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
          ></iframe>

          <div className="absolute bottom-6 left-6 right-6">
            <a
              href="https://maps.google.com/?q=Righini,Lemba,Kinshasa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-5 py-3.5 rounded-xl flex items-center justify-between shadow-xl hover:bg-white dark:hover:bg-zinc-900 transition-colors border border-white/20 dark:border-zinc-800"
            >
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                  Notre Bureau
                </p>
                <p className="text-zinc-800 dark:text-zinc-200 font-medium text-xs sm:text-sm">
                  Righini, Lemba, Kinshasa, RD Congo
                </p>
              </div>
              <div className="bg-amber-500 p-2 rounded-lg text-white shadow-md shadow-amber-500/20">
                <FaEye size={16} />
              </div>
            </a>
          </div>
        </div>
      </motion.div>
        </div>
    </div>
  );
}

 */