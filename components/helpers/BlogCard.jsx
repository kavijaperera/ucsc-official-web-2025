import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils";

export default function BlogCard({ post }) {
  return (
    <article className="group relative grid overflow-hidden rounded-[2rem] border border-secondary-blue/5 bg-white shadow-[0_30px_80px_-30px_rgba(35,73,97,0.25)] lg:grid-cols-[42%_58%]">
      <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[32rem]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 540px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
        <p className="flex flex-wrap items-center gap-x-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-blue">
          <span>{post.category}</span>
          <span aria-hidden className="size-1 rounded-full bg-primary-blue/40" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>

        <h2 className="mt-6 line-clamp-4 break-words text-3xl font-semibold leading-[1.08] tracking-tight text-secondary-blue sm:text-4xl lg:text-[3.2rem] lg:leading-none">
          {post.title}
        </h2>

        <p className="mt-6 line-clamp-3 text-lg leading-7 text-secondary-blue/60">
          {post.description}
        </p>

        <Link
          href={`/blog/${post.slug}/`}
          className="mt-10 inline-flex w-fit items-center gap-3 border-b border-primary-blue pb-1 font-semibold text-primary-blue after:absolute after:inset-0"
        >
          Read full article
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}