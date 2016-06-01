import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

export default class HelpCenterPage extends Component {
  render() {
    return (
      <div
        class="container"
        style={{
          height: '0px',
        }}
      >
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <div>
            <Card>
              <CardHeader
                title="Why should I make an account?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                All your tasks are linked to a guest account the first time you use our app. If you continue to use our app
                through the same device each time, then you have nothing to worry about! Your tasks will be saved securely
                on our server for you to look through at any time. However, making an account with us allows that account
                to be attached to all your tasks and in turn, be accessed from any device that our app supports. This means
                you can access your tasks from wherever you are, regardless of the device you're on, just by signing into
                your account.
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How do I go to the task view or view my unscheduled tasks?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                1. Click the hamburger menu button in the top left corner.<br/>
                2. Once the menu opens, click the Tasks option.<br/>
                3. You will now see your unscheduled tasks by default.
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How do I view my scheduled tasks?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                1. Click the hamburger menu button in the top left corner.<br/>
                2. Once the menu opens, click the Tasks option.<br/>
                3. You should now see three tabs labeled Tasks, Completed, and Scheduled.<br/>
                4. Click the Scheduled tab, and you should now be able to see all scheduled tasks.
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How do I view my completed tasks?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                1. Click the hamburger menu button in the top left corner.<br/>
                2. Once the menu opens, click the Tasks option.<br/>
                3. Any task that has been completed will have the checkbox, on the right of the task item, checked and also be struck through.<br/>
                4. You can also view them by clicking the Completed tab
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How do I add an unscheduled task?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                1. Click the hamburger menu button in the top left corner.<br/>
                2. Once the menu opens, click the Tasks option.<br/>
                3. The top of the page should now say "Tasks" and have three tabs named Tasks, Completed, Scheduled.<br/>
                4. Click the plus sign in the top right corner.<br/>
                5. A new prompt should appear in the middle of the screen.<br/>
                <blockquote>a. Title: The name for your new task.<br/>
                b. Time of day: The general time of day you would like to do said task. (This field will be automatically<br/>
                populated with the current time of day)<br/>
                c. Priority: The priority you would like to give your task.<br/>
                d. Schedule this Task: You can choose to schedule this task for a specific time of day, more on this later.<br/> </blockquote>
                6. Once each field is filled, click the add button, which will be glowing gray, to complete adding a task.
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How do I add a scheduled task?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                1. Go through the steps to add an unscheduled task, reference the "How do I add a task" helper if you are not sure.<br/>
                2. While adding a task, to make it a scheduled task, check the "Schedule this Task" box.<br/>
                3. Once checked, start/end date and time fields will appear.<br/>
                <blockquote>a. Start/End date: Enter the start and end dates you wish for this scheduled task.<br/>
                b. Start/End time: Enter the start and end times you wish for this scheduled task.<br/> </blockquote>
                4. Once each field is filled, click the add button which will be glowing gray, to complete adding a scheduled task.<br/>
                5. The scheduled task should now appear in the Scheduled tab of the task view and the Calendar.
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How are my tasks sorted?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                When you add a task, you specify a time of day that you would like to work on this task. Well, as an added
                convenience, we use this data to sort your tasks by the current time of day and priority so that tasks that
                you want to work on now, will be right at the top!
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How do I complete an unscheduled/scheduled task?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                1. Click the hamburger menu button in the top left corner.<br/>
                2. Once the menu opens, click the Tasks option.<br/>
                3. To complete a task, check the checkbox on the left of the task item.<br/>
                4. The task should now be grayed out, struck through, and have it's checkbox checked.
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How do I edit an unscheduled/scheduled task?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                1. View your tasks, reference "How do I view my tasks?" helper for unscheduled tasks and "How do I view my scheduled task?"
                for scheduled tasks if you are not sure.<br/>
                2. On the right of each task item, there is a button that looks like 3 dots in a column. Click this button.<br/>
                3. The Edit and Delete options will now appear. Click Edit.<br/>
                4. The task prompt should now appear in the middle of the screen. Edit any field in the unscheduled/scheduled task.<br/>
                5. Once you have edited the task to your liking, click the edit button which will be glowing in gray to complete your edit.
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How do I remove an unscheduled/scheduled task?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                1. View your tasks, reference "How do I view my tasks?" helper for unscheduled tasks and "How do I view my scheduled task?"
                for scheduled tasks if you are not sure.<br/>
                2. On the right of each task item, there is a button that looks like 3 dots in a column. Click this button.<br/>
                3. The Edit and Delete options will now appear. Click Delete.<br/>
                4. The task should now be removed from your view.
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How do I re-enter an unscheduled/scheduled task?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                1. Click the hamburger menu button in the top left corner.<br/>
                2. Once the menu opens, click the Tasks option.<br/>
                3. To re-enter a task, uncheck the checkbox on the left of the task item.<br/>
                4. The task should now return to an incomplete unscheduled/scheduled task item and can freely edit it's contents.
                (To edit a task, refer to "How do I edit an unscheduled/scheduled task?" helper above)
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How do I view the calendar?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                1. Click the hamburger menu button in the top left corner.<br/>
                2. Once the menu opens, click the Calendar option.<br/>
                3. The Calendar view should not appear, and scheduled tasks will be shown as blue bars from their given
                start and end dates.
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How do I register?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                1. Click on the hamburger menu button on the top left corner.<br/>
                2. Make sure any user is not logged in - you can see this by checking whether an email is shown under the app logo.<br/>
                <blockquote>a. If a user is logged in, log out by clicking on "Log Out" at the bottom of the menu.<br/> </blockquote>
                3. Click on "Register" at the bottom of menu.<br/>
                4. Fill in the form for the email you wish to be associated with your account as well as a password for your account.<br/>
                5. Click the "Join Now" button.<br/>
                6. You'll be redirected to the Tasks page where you can start adding tasks to your list!
              </CardText>
            </Card>
            <Card>
              <CardHeader
                title="How do I sign in?"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                1. Click on the hamburger menu button on the top left corner.<br/>
                2. Make sure any user is not logged in - you can see this by checking whether an email is shown under the app logo.<br/>
                <blockquote>a. If a user is logged in, log out by clicking on "Log Out" at the bottom of the menu.<br/> </blockquote>
                3. Click on "Sign In" at the bottom of menu.<br/>
                4. Fill out the form with the email of your account along with the password associated with that account.<br/>
                5. Click the "Sign in" button.<br/>
                <blockquote>a. If you get a "User not found" error, then that means there is no account associated with that email.<br/>
                b. If you get a "Incorrect password" error, then that means the wrong password was entered for that account and email.<br/> </blockquote>
                6. You'll be redirected to the Tasks page where you can continue using your list!
              </CardText>
            </Card>
          </div>
        </MuiThemeProvider>

      </div>
    );
  }
}