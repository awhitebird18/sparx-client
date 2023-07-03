import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";

import { CaretDownFill } from "react-bootstrap-icons";

import ListItem from "./ListItem";
import ListHeader from "./ListHeader";

interface Channel {
  id: string;
  name: string;
  image?: string | JSX.Element;
}

interface SectionProps {
  id: string;
  name: string;
  channels: Channel[];
}

const Section = ({ id, name, channels }: SectionProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <ListHeader
        id={id}
        title={name}
        icon={
          <CollapsibleTrigger>
            <CaretDownFill style={{ marginTop: "4px" }} />
          </CollapsibleTrigger>
        }
      />

      <CollapsibleContent>
        {channels.map((channel: Channel) => (
          <ListItem id={channel.id} title={channel.name} src={channel.image} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Section;
