"use client";

import React from "react";
import Link from "next/link";
import { Button, Form, Input, Space } from "antd";
import SocialLinks from "./ui/SocialLinks";

interface FooterFormValues {
  email: string;
}

export default function Footer() {
  const [form] = Form.useForm<FooterFormValues>();

  const onFinish = (values: FooterFormValues) => {
    alert(`Form Submitted: ${values.email}`);
    form.resetFields();
  };

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200/60 dark:border-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 pb-12">
          
          {/* Colonne 1 : Pitch & Newsletter (Prend 5 colonnes sur 12) */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
              N-services Agency
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Analyses, design d'avant-garde et stratégies digitales sur-mesure pour propulser votre business au niveau supérieur.
            </p>
            
            {/* Formulaire Newsletter Compact style SaaS */}
            <Form
              form={form}
              onFinish={onFinish}
              requiredMark={false}
              className="pt-2 max-w-md"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Veuillez entrer votre adresse mail." },
                  { type: "email", message: "Veuillez entrer un e-mail valide." },
                ]}
                className="mb-0"
              >
                <Space.Compact className="w-full">
                  <Input
                    type="email"
                    placeholder="Votre adresse e-mail"
                    className="h-11 px-4 dark:bg-zinc-900 dark:text-white dark:border-zinc-800 dark:placeholder-zinc-500 rounded-l-xl border-zinc-200 focus:border-amber-500 hover:border-amber-500"
                  />
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    className="h-16 bg-amber-500 hover:bg-amber-600 border-none rounded-r-xl font-medium px-5 text-sm"
                  >
                    S'abonner
                  </Button>
                </Space.Compact>
              </Form.Item>
            </Form>
          </div>

          {/* Colonne 2 : Liens de navigation (Prend 4 colonnes sur 12) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm font-medium">
              <li>
                <Link href="/" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  L'agence
                </Link>
              </li>
              <li>
                <Link href="/gallerie/photographie" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Studio Photo
                </Link>
              </li>
              <li>
                <Link href="/blog-actualite" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Blog & Actu
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Réseaux Sociaux (Prend 3 colonnes sur 12) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Suivez notre Studio
            </h3>
            <div className="pt-1">
              <SocialLinks />
            </div>
          </div>

        </div>

        {/* Ligne de pied de page : Mentions légales & Copyright */}
        <div className="pt-8 border-t border-zinc-200/60 dark:border-zinc-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} N-services Agency. Tous droits réservés.</p>
         {/*  <div className="flex gap-6 font-medium">
            <Link href="/privacy" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/terms" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
              Mentions légales
            </Link>
          </div> */}
        </div>

      </div>
    </footer>
  );
}