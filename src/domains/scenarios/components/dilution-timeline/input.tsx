import { NumberFormatValues, NumericFormat, NumericFormatProps } from "react-number-format";
import { Scenario } from "../../types";
import { useState } from "react";
import { useUpdateScenario } from "../../atoms";
import { cn } from "@/lib/utils";

type TimelineEditableTextProps = {
  scenario: Scenario;
  companyId: string
  fieldName: keyof Scenario;
  mapValue?: (val: number) => number;
  displayValue?: (val: number) => number;
  numericformatProps: NumericFormatProps;
};

export const EditableTimelineText: React.FC<TimelineEditableTextProps> = ({ companyId, fieldName, scenario, mapValue, numericformatProps, displayValue }) => {
  const updateScenario = useUpdateScenario();
  const [values, setValues] = useState<NumberFormatValues>();

  const handleBlur = (values: NumberFormatValues) => {
    const { floatValue } = values;
    const updatedValue = mapValue ? mapValue(floatValue) : floatValue;
    const newScenario = { ...scenario, [fieldName]: updatedValue }
    updateScenario(companyId, newScenario)
  }

  return (
    <NumericFormat
      id={fieldName}
      type="text"
      onValueChange={(values) => setValues(values)}
      onBlur={(e) => handleBlur(values)}
      className={cn("capitalize bg-transparent focus:outline-none placeholder-gray-400 py-0 ", numericformatProps.className)}
      {...numericformatProps}
      value={displayValue ? displayValue(numericformatProps.value as number) : numericformatProps.value}
    />
  );
};
