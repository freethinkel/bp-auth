import { describe, expect, it, vi } from 'vitest';
import { createForm } from './form';
import { get } from 'svelte/store';
import { sleep } from './sleep';

describe('createForm factory tests', () => {
	it('Should change values by change function', () => {
		const { values, change } = createForm(
			{
				field: ''
			},
			{
				onSubmit: async () => undefined
			}
		);

		expect(get(values)).toStrictEqual({
			field: ''
		});

		change('field')('test1');

		expect(get(values)).toStrictEqual({
			field: 'test1'
		});
	});

	it('Should call onSubmit if everytning is okay', async () => {
		const onSubmit = vi.fn();
		const { values, change, handleSubmit, errors } = createForm(
			{
				field: ''
			},
			{
				onSubmit,
				validators: {
					field: (value) => (/^\d+$/.test(value) ? '' : 'Field should be a number')
				}
			}
		);

		expect(get(values)).toStrictEqual({
			field: ''
		});

		change('field')('123');
		handleSubmit();
		await sleep(0);

		expect(get(values)).toStrictEqual({
			field: '123'
		});
		expect(get(errors)).toStrictEqual({
			field: ''
		});
		expect(onSubmit).toBeCalled();
	});

	it('Should set errors if the value is invalid', async () => {
		const onSubmit = vi.fn();
		const { values, change, handleSubmit, errors } = createForm(
			{
				field: ''
			},
			{
				onSubmit,
				validators: {
					field: (value) => (/^\d+$/.test(value) ? '' : 'Field should be a number')
				}
			}
		);

		expect(get(values)).toStrictEqual({
			field: ''
		});

		change('field')('test1');
		handleSubmit();
		await sleep(0);

		expect(get(values)).toStrictEqual({
			field: 'test1'
		});
		expect(get(errors)).toStrictEqual({
			field: 'Field should be a number'
		});
		expect(onSubmit).not.toBeCalled();
	});
});
