import React, { PureComponent } from 'react'
import { connect } from 'dva'

import styles from './characterSelect.less'
import { CHARACTER_CREATE } from '../../routes';

class CharacterSelect extends PureComponent {

    goCreate = () => {
        this.props.history.push(CHARACTER_CREATE)
    }

    selectCharacter = (id) => {
        this.dispatch({
            type: 'character/load',
            payload: {
                id
            }
        })
    }

    render = () => {
        const { characters } = this.props
        const characterCards = characters.toJS().map(character => {
            return <CharacterCard onClick={() => this.selectCharacter(character._id)}
                key={character.id} {...character} />
        })

        characterCards.push(<CharacterCard key={'character_create'} onClick={this.goCreate} create={true} />)

        return (<div className={styles.page}>
            <div className={styles.controls}>
                <div className={styles.controlsLeft}>
                    <div className={styles.button} onClick={this.goCreate}>新建角色</div>
                </div>
                <div className={styles.controlsRight}>
                    <div className={styles.display}>{`角色槽位 ${characters.size}/${6}`}</div>
                </div>
            </div>
            <div className={styles.cards}>
                {characterCards}
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        characters: state.user.get('characters')
    }
}

const CharacterCard = (props) => {
    let content
    if (props.create) {
        content = (<div className={styles.create}>
            <div className={styles.plus}></div>
        </div>)
    } else {
        const { name } = props
        content = (<div className={styles.detail}>
            <div>{name}</div>
        </div>)
    }

    return (<div className={styles.card} onClick={props.onClick}>
        {content}
    </div>)
}

export default connect(mapStateToProps)(CharacterSelect);