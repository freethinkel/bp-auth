import nested from 'postcss-nested';
import presetEnv from 'postcss-preset-env';

export default {
	plugins: [nested(), presetEnv()]
};
