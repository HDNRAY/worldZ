import { Component } from 'react';
import PropTypes from 'prop-types';
import Gear from '../../label/gear/gear';
import Field from '../../shared/field/field';

class GearField extends Component {
	render() {
		const { position, insert, invalid, style } = this.props;

		return (
			<Field style={style} invalid={!!invalid} name={Gear.positions[position]}>
				{!!insert ? <Gear where='equiped' position={position} gear={insert} /> : null}
			</Field>
		)
	}
}

GearField.propTypes = {
	position: PropTypes.string.isRequired,
	insert: PropTypes.object
}

export default GearField;