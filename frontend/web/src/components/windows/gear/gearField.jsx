import { Component } from 'react';
import PropTypes from 'prop-types';
import Gear from '../../label/gear/gear';
import Field from '../../shared/field/field';

class GearField extends Component {
	render() {
		const { position, insert } = this.props;

		return (
			<Field name={Gear.positions[position]}>
                {!!insert ? <Gear where='equiped' data={insert}/> : null}
            </Field>
		)
	}
}

GearField.propTypes = {
	name: PropTypes.string.isRequired,
	insert: PropTypes.object
}

export default GearField;