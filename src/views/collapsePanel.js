import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import { device } from 'device.js/dist/device.es'
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import SendIcon from 'material-ui-icons/Send';
import { Link } from 'react-router-dom';
import stylesOut from 'style/index.css';

const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    }
  });
  
  class  SimpleExpansionPanel extends React.Component {
      state = {
        expanded: null,
      };
      handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
      };
 
    render(){
        const { classes } = this.props;
        const { expanded } = this.state;
      return (
        <div className={classes.root}>
               <ExpansionPanel  className={stylesOut.zeroMarginPadding}  expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                  <List>
                    <ListItem>
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItem>Sent mail</ListItem>                        
                    </ListItem>
                  </List>
              </Typography>
            </ExpansionPanelSummary >
            <ExpansionPanelDetails className={stylesOut.ulItemPadding}>
              <Typography>
                  <List>
                  <ListItem>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <Link to="/formsample" >FormSample</Link>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <Link to="/home" >Home</Link>
                    </ListItem>
                  </List>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel  className={stylesOut.zeroMarginPadding}  expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                  <List>
                    <ListItem>
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItem>Sent mail 2</ListItem>                        
                    </ListItem>
                  </List>
              </Typography>
            </ExpansionPanelSummary >
            <ExpansionPanelDetails className={stylesOut.ulItemPadding}>
              <Typography>
                  <List>
                  <ListItem>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <Link to="/formsample" >FormSample 2</Link>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <Link to="/home" >Home 2</Link>
                    </ListItem>
                  </List>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      );
    }
  }
  
  SimpleExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleExpansionPanel);