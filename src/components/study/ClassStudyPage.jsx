import { Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PageHero from "../common/PageHero";
import Reveal from "../common/Reveal";
import Icon from "../common/Icon";
import { ICONS } from "../../data/icons";
import { TOOL_CATALOG } from "../../data/study/toolCatalog";
import { TOOL_COMPONENTS } from "./toolComponents";

// One class's study content.
//   /study-point/<group>/<class>          -> grid of topic cards
//   /study-point/<group>/<class>/<tool>   -> the opened topic
// Each class file (Ukg.jsx, Class3.jsx, ...) only passes its group + class config.
export default function ClassStudyPage({ group, cls }) {
  const { toolId } = useParams();
  const classPath = `${group.basePath}/${cls.slug}`;

  const tools = cls.tools.map((t) => ({
    ...TOOL_CATALOG[t.id],
    ...(t.title && { title: t.title }),
    ...(t.blurb && { blurb: t.blurb }),
    id: t.id,
    props: t.props ?? {},
  }));

  const active = toolId ? tools.find((t) => t.id === toolId) : null;
  if (toolId && !active) return <Navigate to={classPath} replace />;

  const Tool = active ? TOOL_COMPONENTS[active.id] : null;

  return (
    <>
      <PageHero
        title={active ? active.title : `${cls.title} Study Point`}
        crumb={cls.title}
        intro={active ? `${cls.title} · ${group.title}` : cls.note}
      />
      <section className="bg-paper-50">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <nav className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-navy-900/70">
            <Link to={group.basePath} className="inline-flex items-center gap-2 transition-colors hover:text-saffron-600">
              <Icon d={ICONS.arrow} size={16} className="rotate-180" /> {group.title}
            </Link>
            {active && (
              <Link to={classPath} className="inline-flex items-center gap-2 transition-colors hover:text-saffron-600">
                <Icon d={ICONS.arrow} size={16} className="rotate-180" /> All {cls.title} topics
              </Link>
            )}
          </nav>

          {Tool ? (
            <Suspense fallback={<p className="py-16 text-center text-ink-900/60">Loading…</p>}>
              <Tool {...active.props} />
            </Suspense>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((t, i) => (
                <Reveal key={t.id} delay={(i % 3) * 90} from="zoom">
                  <Link
                    to={`${classPath}/${t.id}`}
                    className="group flex h-full flex-col rounded-2xl border border-navy-900/10 bg-paper-100 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 font-display text-xl text-paper-50 transition-colors duration-300 group-hover:bg-saffron-600" aria-hidden="true">
                      {t.emoji}
                    </span>
                    <h2 className="mt-4 font-display text-xl font-semibold text-navy-900">{t.title}</h2>
                    <p className="mt-2 flex-1 leading-relaxed text-ink-900/65">{t.blurb}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-saffron-600">
                      Open <Icon d={ICONS.arrow} size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
