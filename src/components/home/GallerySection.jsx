import { GALLERY } from "../../data/gallery";
import Reveal from "../common/Reveal";
import Button from "../common/Button";
import SectionHeading from "../common/SectionHeading";
import ComingSoonTile from "../common/ComingSoonTile";
import Icon from "../common/Icon";
import { ICONS } from "../../data/icons";

function GallerySection() {
  const first = GALLERY[0];

  return (
    <section className="bg-paper-100">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <SectionHeading eyebrow="A peek inside" title="Gallery">
          <Button to="/gallery" variant="outline">
            View full gallery
            <Icon d={ICONS.arrow} size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </SectionHeading>

        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
          <Reveal from="zoom" className="col-span-2 row-span-2">
            <div className="group h-full overflow-hidden rounded-2xl shadow-md">
              <img src={first.src} alt={first.alt} className="h-full min-h-[290px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </Reveal>
          {[90, 140, 190, 240].map((d) => (
            <Reveal key={d} delay={d} from="zoom"><ComingSoonTile /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
