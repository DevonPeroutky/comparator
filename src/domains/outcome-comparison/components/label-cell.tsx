import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TableCell } from "@/components/ui/table";
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import AnimatedShinyText from "@/components/ui/animated-shiny-text";


export type LabelCellProps = {
  label: ReactNode;
  tooltip?: ReactNode;
}
export const LabelCell: React.FC<LabelCellProps> = ({ label, tooltip, highlighted }) => {

  return (
    <TableCell className="w-fit capitalize" key={`${label}-label`}>
      <div className="flex items-center gap-x-2">
        <span>
          {label}
        </span>
        {tooltip &&
          (
            <Tooltip>
              <TooltipTrigger asChild>
                <QuestionMarkCircleIcon className="w-6 h-6" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )
        }
      </div>
    </TableCell>
  )
}
