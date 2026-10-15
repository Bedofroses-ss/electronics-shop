import { COMPARISON, COMPARISON_LINEUP } from '../data/content'
import { DeviceMockup } from './DeviceMockup'
import { Section } from './Section'

/** Секция сравнения: ряд заглушек устройств и таблица характеристик. */
export function ComparisonSection() {
  return (
    <Section id={COMPARISON.id} webgl={COMPARISON.webgl} background="bg-ink/50">
      <h2
        id="comparison-heading"
        className="mb-12 text-center text-4xl font-semibold leading-tight text-mist md:text-6xl"
        data-animation="title"
      >
        {COMPARISON.heading}
      </h2>

      {/* Ряд устройств: пропорции корпусов соблюдены, 3D здесь не используется */}
      <div className="mb-16 flex flex-wrap items-end justify-center gap-10" data-animation="fadeIn">
        {COMPARISON_LINEUP.map((item) => (
          <figure key={item.name} className="flex flex-col items-center gap-4">
            <DeviceMockup kind={item.kind} className="h-40 md:h-56" />
            <figcaption className="text-sm text-mist">{item.name}</figcaption>
          </figure>
        ))}
      </div>

      <div className="overflow-x-auto" data-animation="fadeIn">
        <table className="w-full border-collapse text-left text-sm" aria-labelledby="comparison-heading">
          <thead>
            <tr>
              <th scope="col" className="p-4 text-graphite">
                {COMPARISON.specColumnLabel}
              </th>
              {COMPARISON.devices.map((device) => (
                <th scope="col" key={device} className="p-4 font-semibold text-mist">
                  {device}
                </th>
              ))}
            </tr>
          </thead>
          <tbody data-animation="rowsFade">
            {COMPARISON.rows.map((row) => (
              <tr key={row.label} className="border-t border-white/10">
                <th scope="row" className="p-4 font-normal text-graphite">
                  {row.label}
                </th>
                {row.values.map((value, index) => (
                  <td key={`${row.label}-${index}`} className="p-4 text-mist">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
