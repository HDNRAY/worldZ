import React, { PureComponent } from 'react'
import { connect } from 'dva'

import styles from './characterCreate.less'
import Button from '../../../components/control/button/button';
import Input from '../../../components/control/input/input';
import RadioGroup from '../../../components/control/radio/radioGroup';
import { basicAttributes } from '../../../services/constant/attributes';
import Number from '../../../components/control/number/number';

class CharacterCreate extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            gender: 1,
            nickname: '',
            attributes: Object.keys(basicAttributes).reduce((result, item) => {
                result[item] = 10
                return result
            }, {}),
        }
    }


    genderRadioOptions = [{
        value: 1,
        label: '男'
    }, {
        value: 0,
        label: '女'
    }]

    onNicknameChange = (value) => {
        this.setState({
            nickname: value,
            nicknameMessage: value ? '' : '请输入姓名'
        })
    }

    onGenderChange = (value) => {
        this.setState({
            gender: +value
        })
    }

    onAttributeChange = (attribute, value) => {
        const attributes = this.state.attributes
        attributes[attribute] += value
        this.setState({
            attributes: attributes
        })
    }

    onCreateClick = () => {
        if (!this.state.nickname) {
            this.setState({
                nicknameMessage: '请输入姓名'
            })
        } else {
            this.props.dispatch({
                type: 'character/create',
                payload: {
                    character: {
                        name: this.state.nickname,
                        attributes: this.state.attributes,
                        gender: this.state.gender
                    }
                }
            })
        }
    }

    render = () => {
        const { history } = this.props
        const { gender, attributes, nicknameMessage } = this.state

        const attributeSettings = Object.keys(basicAttributes).map((item, index) => {
            const attribute = basicAttributes[item]
            return <div key={attribute.name + index} className={styles.attributeAdjust}>
                <div className={styles.attributeName}>{attribute.name}</div>
                <div>
                    <Number onChange={value => this.onAttributeChange(item, value)} value={attributes[item]}></Number>
                </div>
            </div>
        })

        return (<div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.nameLine}>
                    <div className={styles.nicknamePanel}>
                        <Input onChange={this.onNicknameChange} message={nicknameMessage} placeholder="角色名"></Input>
                    </div>
                    <div className={styles.genderPanel}>
                        <RadioGroup options={this.genderRadioOptions} value={gender} onChange={this.onGenderChange} />
                    </div>
                </div>
                <div className={styles.attributeLine}>
                    {attributeSettings}
                </div>
                <div className={styles.submitLine}>
                    <Button text='新建' onClick={this.onCreateClick}></Button>
                    <Button text='返回' onClick={history.goBack}></Button>
                </div>
            </div>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(CharacterCreate);