import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TableCell } from "@/components/ui/table";
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'


export type LabelCellProps = {
  label: ReactNode;
  tooltip?: ReactNode;
}
export const LabelCell: React.FC<LabelCellProps> = ({ label, tooltip }) => {

  return (
    <TableCell className="w-fit">
      <div className="flex justify-start items-center gap-x-2 text-muted-foreground font-semibold text-start">
        <span className="capitalize">
          {label}
        </span>
        {tooltip && (
          <div className="hidden md:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <QuestionMarkCircleIcon className="w-6 h-6 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </TableCell>
  )
}
