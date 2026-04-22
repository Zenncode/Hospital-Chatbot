import Chatbot from "@/components/Chatbot";
import FAQList from "@/components/FAQList";

export default function FAQPage() {
  return (
    <div className="site-shell space-y-10 pb-8">
      <section className="panel px-6 py-8 sm:px-8">
        <p className="eyebrow">FAQ Directory</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
          Fixed answers for common hospital questions
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate">
          FAQ responses are stored as approved Firestore records and reused by the
          chatbot matcher. This keeps public guidance consistent across the site.
        </p>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <FAQList />
        <Chatbot />
      </div>
    </div>
  );
}
