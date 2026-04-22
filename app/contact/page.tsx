import ContactDetails from "@/components/ContactDetails";

export default function ContactPage() {
  return (
    <div className="site-shell space-y-10 pb-8">
      <section className="panel px-6 py-8 sm:px-8">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
          How to reach the hospital
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate">
          This page reads from the `contact_info` collection and gives users a clear
          path for support, directions, and visitor planning.
        </p>
      </section>

      <ContactDetails />
    </div>
  );
}
