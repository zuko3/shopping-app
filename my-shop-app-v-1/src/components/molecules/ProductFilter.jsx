import "react";

const filterComponents = {
  highLow: HighLowFilter,
  price: PriceFilter,
  color: ColorFilter,
};

export function ProductFilter({ type }) {
  const ComponentToRender = filterComponents[type];
  if (!ComponentToRender) {
    return null;
  }
  return <ComponentToRender />;
}

function HighLowFilter() {
  return (
    <FilterSection title="Sort">
      <RadioOption name="sort" label="Low → High" />
      <RadioOption name="sort" label="High → Low" />
    </FilterSection>
  );
}

function PriceFilter() {
  return (
    <FilterSection title="Budget">
      <CheckboxOption label="Under ₹10K" />
      <CheckboxOption label="₹10K - ₹50K" />
      <CheckboxOption label="Above ₹50K" />
    </FilterSection>
  );
}

function ColorFilter() {
  return (
    <FilterSection title="Colors">
      <CheckboxOption label="Black" />
      <CheckboxOption label="White" />
      <CheckboxOption label="Blue" />
    </FilterSection>
  );
}

function FilterSection({ title, children }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-gray-900">{title}</h3>
      <div className="space-y-2 text-sm text-gray-600">{children}</div>
    </div>
  );
}

function CheckboxOption({ label }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" />
      {label}
    </label>
  );
}

function RadioOption({ name, label }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="radio" name={name} />
      {label}
    </label>
  );
}
