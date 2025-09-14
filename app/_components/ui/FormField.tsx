import { Input } from "./Input";
import { Label } from "./Label";

interface FormFieldProps {
	id: string;
	label: string;
	type: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	required?: boolean;
}

export function FormField({
	id,
	label,
	type,
	placeholder,
	value,
	onChange,
	disabled = false,
	required = false,
}: FormFieldProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor={id}>
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</Label>
			<Input
				id={id}
				name={id}
				type={type}
				placeholder={placeholder}
				className="h-12"
				value={value}
				onChange={onChange}
				disabled={disabled}
				required={required}
			/>
		</div>
	);
}
