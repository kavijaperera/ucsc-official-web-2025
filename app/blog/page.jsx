import { blogs } from "@/utils";
import BlogCard from "@/components/helpers/BlogCard";

export const metadata = {
  title: "Blog | IEEE UCSC",
  description:
    "Event highlights, technical articles and community updates from the IEEE Student Branch of UCSC.",
};

export default function BlogPage() {
  const posts = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main>
      <section className="relative overflow-hidden border-b border-secondary-blue/10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-primary-blue/5 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-16 left-16 hidden h-24 w-24 rounded-full border border-secondary-blue/10 lg:block"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-20 pt-40 lg:flex-row lg:items-end lg:justify-between lg:pb-28 lg:pt-52">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-blue">
              From the Branch
            </p>
            <h1 className="mt-8 text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-secondary-blue sm:text-7xl lg:text-[8rem] lg:leading-[0.96]">
              Ideas, events,
              <br />
              <span className="text-primary-blue">and people.</span>
            </h1>
          </div>

          <p className="max-w-[22rem] text-xl leading-8 text-secondary-blue/60 lg:mb-4">
            Stories from the IEEE Student Branch of{" "}
            <span className="whitespace-nowrap">UCSC—sharing</span> what we
            learn, build, and celebrate together.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="flex items-center gap-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-blue">
            Latest Stories
          </h2>
          <span className="h-px flex-1 bg-primary-blue/20" />
        </div>

        <div className="mt-12 space-y-12">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}