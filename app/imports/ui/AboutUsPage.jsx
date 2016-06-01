import React, { Component } from 'react';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

const darkMuiTheme = getMuiTheme(darkBaseTheme);
const lightMuiTheme = getMuiTheme(lightBaseTheme);

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    background: '#04bedc',
  },
  gridList: {
    width: 500,
    //height: 500,
    //overflowY: 'auto',
    marginBottom: 24,
  },
};

const memberData = [
  {
    img: '/images/spencer-wilson.jpg',
    title: 'Spencer Wilson',
    link: '#spencer',
    role: 'Project Manager',
    bio: 'Spencer, the team manager. As the manager of the team, he was in charge of ' +
    'organizing and distributing tasks to the rest of the team. He also guided the team ' +
    'in tough or confusing aspects to keep them on track, so that the deadlines can be met. ' +
    'He worked very hard on the project itself, the organization of the project, and also team ' +
    'morale so that the team could go through the rough patches with minimal damage. Spencer’s ' +
    'contributions to the application in both organization and development cannot be understated.',
  },
  {
    img: '/images/david-lu.jpg',
    title: 'David Lu',
    link: '#david',
    role: 'Business Analyst',
    bio: 'David here is the Business Analyst, and he did the research on what content should ' +
    'be used in the application and helped make sure that the business aspects were properly ' +
    'integrated into the project. David came up with the application idea and fleshed out how he ' +
    'envisioned it to the group, so that a clear picture could be made for the general idea of ' +
    'the application. David helped spur the line of thinking from group and essentially got the ' +
    'ball rolling, helping create the initial push towards productivity.',
  },
  {
    img: '/images/jessy-ayala.jpg',
    title: 'Jessy Ayala',
    link: '#jessy',
    role: 'Senior System Analyst',
    bio: 'The Senior System Analyst is Jessy, and he was in charge of developing the use case' +
    ' and user stories. In layman’s terms, he helped convey the initial ideas of what the ' +
    'application should do for the customer, explicitly stating what each function should do ' +
    'and what the process should be for each function. Making sure the application was ' +
    'customer-oriented, Jessy helped guide the group’s line of thinking to focus on precisely ' +
    'what the customer would want in the application so that development can be focused and ' +
    'efficient. Jessy providing the guidance for the rest of the team for what the customer ' +
    'would want significantly helped with development.',
  },
  {
    img: '/images/kevin-chen.jpg',
    title: 'Kevin Chen',
    link: '#kevin',
    role: 'Software Architect',
    bio: 'Kevin is the software architect, and he helped coordinate the design and chose the ' +
    'technologies to use for the application. In his research, Kevin found Meteor, a helpful ' +
    'web framework that incorporated JavaScript and allowed cross-platform code, and also ' +
    'found react, a JavaScript library to help simplify the code. This, alongside with his ' +
    'design implementations, helped make the design process much easier and helped productivity ' +
    'skyrocket. Thank you, Kevin, we couldn’t have done it without you.',
  },
  {
    img: '/images/oscar-song.jpg',
    title: 'Oscar Song',
    link: '#oscar',
    role: 'Software Development Lead',
    bio: 'The software development lead is Oscar, and he helped to coordinate the development ' +
    'of the software components. As the software developer lead, Oscar was in charge of helping ' +
    'the developers create a successful program. This was done through beginning to create ' +
    'solutions and practical elements to implement the software architect’s vision. From this, ' +
    'the building the underlying architecture started right away, and the development became' +
    ' very productive.',
  },
  {
    img: '/images/stanley-phu.jpg',
    title: 'Stanley Phu',
    link: '#stanley',
    role: 'Algorithm Specialist',
    bio: 'Stanley is the algorithm specialist, meaning that he decided what specific designs ' +
    'we would implement to make the software code perform the tasks we wanted. Alongside the ' +
    'large amount of coding done, Stanley also had to decide how to manipulate the data and ' +
    'organize it in a mathematically correct function that fit what the application needed, so ' +
    'the processes such as the organization of task priority and time of day can be credited ' +
    'to Stanley.',
  },
  {
    img: '/images/zach-kvick.jpg',
    title: 'Zach Kvick',
    link: '#zach',
    role: 'Database Specialist',
    bio: 'The database specialist for the project is Zack, and he maintained the database and ' +
    'helped be sure that the data from the user is properly stored in the correct area and can be ' +
    'accessed again when needed. Zack went with MongoDB as a cross-platform database, which used ' +
    'a dynamic schema to integrate data in a faster and easier way. This helped the application ' +
    'store the tasks with the correct user and the correct data so that it can be organized and ' +
    'accessed correctly. Great job, Zack!',
  },
  {
    img: '/images/benny-fung.jpg',
    title: 'Benny Fung',
    link: '#benny',
    role: 'Quality Assurance Lead',
    bio: 'Benny is the quality assurance lead, creating test cases and ensuring that proper ' +
    'procedures were followed. Throughout the code development, Benny would test the application ' +
    'and make sure that the changes were relevant and didn’t break any part of the application, ' +
    'and helped notify the team if they did. His test cases help assure the highest of quality for ' +
    'the application, and that any cut corners or loose ends were taken care of. Thanks, Benny!',
  },
  {
    img: '/images/adam-liu.jpg',
    title: 'Adam Liu',
    link: '#adam',
    role: 'User Interface Specialist',
    bio: 'One of the User Interface Specialists was Adam, primarily focusing on user experience ' +
    'to help the application’s look and feel all come together in the end. He created the sample ' +
    'screens to indicate how the application should look and provided guidance to the developers on ' +
    'how the GUI, or graphical user interface, should be. This helped create a clean, concise look for ' +
    'the application and helped it go from being purely functional to appealing for the common ' +
    'application user, so hats off to Adam.',
  },
  {
    img: '/images/jeffrey-wu.jpg',
    title: 'Jeffrey Wu',
    link: '#jeffrey',
    role: 'User Interface Specialist',
    bio: 'One of the User Interface Specialists was Jeffrey, primarily focusing on user experience ' +
    'to help the application’s look and feel all come together in the end. He created the sample ' +
      'screens to indicate how the application should look and provided guidance to the developers on ' +
    'how the GUI, or graphical user interface, should be. This helped create a clean, concise look for ' +
    'the application and helped it go from being purely functional to appealing for the common ' +
    'application user, so hats off to Jeffery.',
  },
];

export default class AboutUsPage extends Component {

  render() {
    return (
      <div
        class="container"
        style={{
          height: '0px',
          padding: '.2em 1em 0 1em',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '60em',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <div style={styles.root}>
            {memberData.map((member) => (
              <Card
                key={member.img}
                style={{
                  margin: '10px auto',
                  minWidth: '10em',
                }}
              >
                <CardHeader
                  avatar={<Avatar src={member.img} size={100} />}
                  title={member.title}
                  subtitle={member.role}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  textStyle={{
                    paddingRight: '0px',
                  }}
                  titleStyle={{
                    'font-size': '1.1em',
                  }}
                  subtitleStyle={{
                    'font-size': '1em',
                  }}
                />
                <CardText
                  style={{
                    textAlign: 'justified',
                  }}>
                  {member.bio}
                </CardText>
              </Card>
            ))}
          </div>
        </MuiThemeProvider>

      </div>
    );
  }
}