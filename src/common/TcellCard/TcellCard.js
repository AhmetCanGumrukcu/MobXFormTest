import React from 'react';
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
  root: {
        margin: 20,
        background: 'white'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center'
    }
});



class TcellCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.viewItem = this.props.viewStore.getItem(this.props.name);
    }

    viewItem = null;

    handleExpandClick() {
        this.viewItem.expanded = !this.viewItem.expanded;
    };
    render() {
        const { raised, children, classes, title, subtitle, name } = this.props;

        return (
            <Card raised={raised} classes={{ root: classes.root }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe">R</Avatar>
                    }
                    title={<div className={classes.flexContainer}>
                        <span>{title}</span>
                        <div className={classes.flexGrow} />
                        <IconButton className={classnames(classes.expand, { [classes.expandOpen]: this.viewItem.expanded })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.viewItem.expanded}
                            aria-label="Show more">
                            <ExpandMoreIcon />
                        </IconButton></div>}
                    subheader={subtitle}
                />
                <Collapse in={this.viewItem.expanded} transitionDuration="auto" >
                    <CardContent>
                        {children}
                    </CardContent>
                </Collapse>
            </Card>

        );
    }
}

TcellCard.propTypes = {
    viewStore: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    raised: PropTypes.bool,
    expanded: PropTypes.bool,
    title: PropTypes.string,
    subtitle: PropTypes.string
}

TcellCard.defaultProps = {
    raised: false,
    expanded: false,
    title: 'Title is here...',
    subtitle: ''
}

export default withStyles(styles)(observer(TcellCard));


