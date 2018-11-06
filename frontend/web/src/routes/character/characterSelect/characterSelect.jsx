import React, { PureComponent } from 'react'
import { connect } from 'dva'

import styles from './characterSelect.less'
import { CHARACTER_CREATE } from '../../routes';

class CharacterSelect extends PureComponent {

    componentWillMount = () => {
        this.props.dispatch({
            type: 'user/loadCharacters'
        })
    }

    goCreate = () => {
        this.props.history.push(CHARACTER_CREATE)
    }

    selectCharacter = (id) => {
        const { history, dispatch } = this.props
        dispatch({
            type: 'character/selectCharacter',
            payload: {
                id
            }
        })
        history.push('/game')
    }

    render = () => {
        const { characters, characterLimit } = this.props
        const characterCards = characters.toJS().map(character => {
            return <CharacterCard onClick={() => this.selectCharacter(character._id)}
                key={character._id} {...character} />
        })

        while (characterCards.length < characterLimit) {
            characterCards.push(<CharacterCard key={'character_create_' + characterCards.length} onClick={this.goCreate} create={true} />)
        }

        return (<div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.controls}>
                    <div className={styles.controlsLeft}>
                        {characters.size < characterLimit ? <div className={styles.button} onClick={this.goCreate}>新建角色</div> : null}
                    </div>
                    <div className={styles.controlsRight}>
                        <div className={styles.display}>{`角色槽位 ${characters.size}/${characterLimit}`}</div>
                    </div>
                </div>
                <div className={styles.cards}>
                    {characterCards}
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        characters: state.user.get('characters'),
        characterLimit: state.user.get('characterLimit')
    }
}

const CharacterCard = (props) => {
    let content
    if (props.create) {
        content = (<div className={styles.create}>
            <div onClick={props.onClick} className={styles.plus}></div>
        </div>)
    } else {
        const { name } = props
        content = (<div className={styles.detail}>
            <div onClick={props.onClick} className={styles.badge}>{name}</div>
        </div>)
    }

    return (<div className={styles.card} >
        {content}
    </div>)
}

export default connect(mapStateToProps)(CharacterSelect);