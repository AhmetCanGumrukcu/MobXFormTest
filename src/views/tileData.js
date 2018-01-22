import React from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom'
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';
import styles from 'style/index.css';
import className from 'classnames';
import Collapse from 'material-ui/transitions/Collapse';

const marginPri = {
    paddingLeft:"30px"
  } 

export const mailFolderListItems = (
    
    <div>
        <ListItem button>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>           
            <Link className={className('mdl-navigation__link' , styles.test)}  to="/" >Test</Link>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>           
            <Link className={className('mdl-navigation__link' , styles.test)}  to="/" >Home</Link>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <StarIcon />
            </ListItemIcon>
            <Link className={className("mdl-navigation__link", styles.test)} to="/formsample">
                formsample
            </Link>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <Link className={className("mdl-navigation__link", styles.test)} to="/formsample">
            <ListItemText primary="Send mail" />
            </Link>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
        </ListItem>
        <Collapse component="li" timeout="auto" unmountOnExit>
            <List disablePadding>
              <ListItem button style={marginPri}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText inset primary="Sub Menu 1" />
              </ListItem>
              <ListItem button style={marginPri}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText inset primary="Sub Menu 2" />
              </ListItem>
              <ListItem button style={marginPri}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText inset primary="Sub Menu 3" />
              </ListItem>
            </List>
          </Collapse>
    </div>
);

export const otherMailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary="All mail" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Spam" />
        </ListItem>
    </div>
);