export type SnackbarMessage = {
	id: number;
	kind: 'error' | 'warning' | 'suvcess' | 'info';
	title: string;
};
