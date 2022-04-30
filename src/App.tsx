import React, { useState } from 'react';
import './App.css';
import FullCalendar, { createDuration } from '@fullcalendar/react';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import listPlugin from '@fullcalendar/list';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'


function App() {
  // sketch useState but oh well
  const [g1, setG1] = useState(false);
  const [g2, setG2] = useState(false);
  const [g3, setG3] = useState(false);
  const [g4, setG4] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  
    const groups = [
      { id: 1, title: 'Manchester Back', name: 'Manchester Back Available', color: 'rgba(165, 42, 42, ' },
      { id: 2, title: 'Manchester Front', name: 'Manchester Front Available', color: 'rgba(140, 20, 252, ' },
      { id: 3, title: 'Montgomery North', name: 'Montgomery North Available', color: 'rgba(45, 85, 255, ' },
      { id: 4, title: 'Montgomery South', name: 'Montgomery South Available', color: 'rgba(30, 130, 76, ' }
    ]

    let titleToGroupId: { [title: string]: number } = {}
    groups.forEach(group => {titleToGroupId[group.name] = group.id})

    let titleToColor: { [title: string]: string } = {}
    groups.forEach(group => {titleToColor[group.name] = group.color})
  

  // @ts-ignore
  const itemRenderer: ItemRendererGetItemPropsReturnType = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected ? (itemContext.dragging ? "red" : item.selectedBgColor) : item.bgColor;
    const borderColor = itemContext.resizing ? "red" : item.color;
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: item.color,
            border: "1px solid " + borderColor,
            borderRadius: 4,
          },
          onMouseDown: () => {
            console.log("on item click", item);
          }
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    );
  };

    return (
      <div className="App">
        <div id="hideme">
          <FullCalendar
            // ref={this.calendarRef}
            plugins={[ listPlugin, googleCalendarPlugin ]}
            googleCalendarApiKey = 'TODO:APIKEY'
            initialView='list'
            duration={createDuration({ days: 730 })}
            eventSources={[
              {
                googleCalendarId: 'c14qpbkomnhi19v6lqqchiv0rg@group.calendar.google.com',
                success: function(data) {
                  if (!g1) {
                    setG1(true)
                    setItems(prev => {
                      return [...prev, ...data.map(eventToEvent)];
                    })
                  }
                },
              },
              {
                googleCalendarId: 'ufri8h0ma7fgst5tq6oprb7igc@group.calendar.google.com',
                success: function(data) {
                  if (!g2) {
                    setG2(true)
                    setItems(prev => {
                      return [...prev, ...data.map(eventToEvent)];
                    })
                  }
                },
              },
              {
                googleCalendarId: 'frkm69bgkie5ifd1rn3mjrtftk@group.calendar.google.com',
                success: function(data) {
                  if (!g3) {
                    setG3(true)
                    setItems(prev => {
                      return [...prev, ...data.map(eventToEvent)];
                    })
                  }
                },
              },
              {
                googleCalendarId: '3757gqadi4inj5v53ol10r3fss@group.calendar.google.com',
                success: function(data) {
                  if (!g4) {
                    setG4(true)
                    setItems(prev => {
                      return [...prev, ...data.map(eventToEvent)];
                    })
                  }
                },
              },
            ]}
          />
        </div>
          <Timeline 
            groups={groups} 
            items={items}
            defaultTimeStart={moment()}
            defaultTimeEnd={moment().add(1, 'month')}
            itemRenderer={itemRenderer}
            sidebarWidth={200}>
          </Timeline>
      </div>
    );

    function eventToEvent(event:any): any{
      return {
        id: "id" + Math.random().toString(16).slice(2),
        group: titleToGroupId[event.title],
        title: "Available",
        start_time: moment(event.start).add(12, 'hours'),
        end_time: moment(event.end).add(9,'hours'),
        color: titleToColor[event.title]+"1)",
        bgColor: titleToColor[event.title]+"0.1)",
        selectedBgColor: titleToColor[event.title]+"0.3)",
        canMove: false,
        canResize: false,
        canChangeGroups: false,
      }
    }

}

export default App;
