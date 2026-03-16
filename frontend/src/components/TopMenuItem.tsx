import Link from 'next/link';

export default function TopMenuItem({ title, pageRef }: { title: string, pageRef: string }) {
  return (
    <Link href={pageRef} className="text-gray-800 hover:text-blue-600 font-semibold px-4 py-2">
      {title}
    </Link>
  );
}