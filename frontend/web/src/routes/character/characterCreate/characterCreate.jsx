import React, { PureComponent } from 'react'
import { connect } from 'dva'

import styles from './characterCreate.less'
import Button from '../../../components/form/button/button';
import Input from '../../../components/form/input/input';
import RadioGroup from '../../../components/form/radio/radioGroup';

class CharacterCreate extends PureComponent {
    genderRadioOptions = [{
        value: 1,
        label: '男'
    }, {
        value: 0,
        label: '女'
    }]

    onNicknameChange = (value) => {

    }

    onGenderChange = (value) => {

    }

    render = () => {
        const { nicknameMessage } = this.props

        return (<div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.createLine}>
                    <Input onChange={this.onNicknameChange} message={nicknameMessage} placeHolder="昵称"></Input>
                    <RadioGroup options={this.genderRadioOptions} defaultValue={1} onChange={this.onGenderChange} />
                </div>
                <div className={styles.createLine}></div>
                <div className={styles.createLine}>
                    <Button text='新建'></Button>
                </div>
            </div>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(CharacterCreate);