import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs, formatDate } from "@/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} | IEEE UCSC` : "Blog | IEEE UCSC",
    description: post?.description,
  };
}

const dropCap =
  "first-letter:float-left first-letter:mr-3 first-letter:text-[4.5rem] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-primary-blue";

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article>
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-48 top-20 h-[36rem] w-[36rem] rounded-full bg-primary-blue/5 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-36 lg:pt-44">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-blue transition-opacity hover:opacity-70"
          >
            <span aria-hidden>←</span>
            Back to all stories
          </Link>

          <p className="mt-14 flex flex-wrap items-center gap-x-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-blue">
            <span>{post.category}</span>
            <span aria-hidden className="size-1 rounded-full bg-primary-blue/40" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>

          <h1 className="mt-6 max-w-6xl break-words text-4xl font-semibold leading-[1.1] tracking-tight text-secondary-blue sm:text-6xl lg:text-[5.8rem] lg:leading-[1.05]">
            {post.title}
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-secondary-blue/60">
            {post.description}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[47rem] px-6">
        <figure className="mx-auto max-w-2xl">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(35,73,97,0.35)]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
            />
          </div>
          {post.imageCaption && (
            <figcaption className="mt-4 text-sm leading-6 text-secondary-blue/50">
              {post.imageCaption}
            </figcaption>
          )}
        </figure>
      </div>

      <div className="mx-auto max-w-[47rem] px-6 pb-24 pt-20">
        <span className="block h-1 w-16 rounded bg-primary-blue" />

        <div className="mt-10 space-y-7 text-xl leading-9 text-secondary-blue/90">
          {post.content.map((paragraph, index) => (
            <p key={index} className={index === 0 ? dropCap : undefined}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 border-t border-secondary-blue/10 pt-8">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-3 font-semibold text-primary-blue transition-opacity hover:opacity-70"
          >
            <span aria-hidden>←</span>
            Explore more stories
          </Link>
        </div>
      </div>
    </article>
  );
}