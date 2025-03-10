export function SiteLinkSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h4 className="text-md text-orange-300 mb-4 pb-2 border-b-2">{title}</h4>
      <div>{children}</div>
    </div>
  )
}
