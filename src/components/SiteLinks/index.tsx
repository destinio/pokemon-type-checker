import { generalLinks, urls } from './links'
import { SiteLinkSection } from './SiteLinkSection'

export default function SiteLinks({
  pokemon,
}: {
  pokemon: { name: string; id: number }
}) {
  return (
    <div>
      <h3 className="text-xl text-sky-400 mb-4 font-extrabold">Links:</h3>

      <div className="flex flex-col gap-8">
        <SiteLinkSection title="Links by name/id">
          <div className="grid grid-cols-2 gap-4">
            {urls.map(url => (
              <div key={url.section} className="flex flex-col gap-4">
                <h5 className="text-orange-400">{url.section}</h5>
                <div className="flex flex-col gap-4">
                  {url.links.map(link => (
                    <a
                      key={link.name}
                      href={`${link.url}${link.type === 'name' ? pokemon.name : pokemon.id}`}
                      target="_blank"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SiteLinkSection>

        <SiteLinkSection title="General">
          <div className="flex flex-col gap-4">
            {generalLinks.map(link => (
              <a key={link.name} href={link.url} target="_blank">
                {link.name}
              </a>
            ))}
          </div>
        </SiteLinkSection>
      </div>
    </div>
  )
}
