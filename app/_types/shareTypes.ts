export interface ShareFormData {
	title: string;
	content: string;
	selectedTheme: string | null;
	hashtags: string[];
	hashtagInput: string;
}

export interface ThemeOption {
	emoji: string;
	label: string;
}
