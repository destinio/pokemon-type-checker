interface ISectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: ISectionProps) {
  return (
    <section className='mb-4 flex flex-col gap-4'>
      <h2 className="text-2xl mb-4 font-extrabold border-slate-400 border-l-8 pl-2">{title}</h2>
      <div className='flex flex-col gap-6'>
        {children}
      </div>
    </section>
  )
}
