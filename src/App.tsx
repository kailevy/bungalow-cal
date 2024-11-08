import React, { useEffect, useState } from 'react';
import FullCalendar, { createDuration } from '@fullcalendar/react';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import listPlugin from '@fullcalendar/list';
import Timeline from 'react-calendar-timeline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar-timeline/lib/Timeline.css'
import './App.css';
import moment from 'moment';


function App() {
  // sketch useState but oh well
  const [g1, setG1] = useState(false);
  const [g2, setG2] = useState(false);
  const [g3, setG3] = useState(false);
  const [g4, setG4] = useState(false);
  const [g5, setG5] = useState(false);
  const [g6, setG6] = useState(false);
  const [g7, setG7] = useState(false);
  const [g8, setG8] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [width, setWidth] = useState<number>(window.innerWidth);


  const isMobile = width <= 768;
  
  const groups = [
    { id: 1, title: 'Manchester Front', name: 'Manchester Front Available', color: 'rgba(146, 69, 161, ' },
    { id: 2, title: 'Manchester Back',  name: 'Manchester Back Available',  color: 'rgba(212, 70, 49, ' },
    { id: 3, title: 'Montgomery North', name: 'Montgomery North Available', color: 'rgba(45, 79, 216, ' },
    { id: 4, title: 'Montgomery South', name: 'Montgomery South Available', color: 'rgba(73, 87, 22, ' },
    { id: 5, title: 'Moonlight',        name: 'Moonlight Available',        color: 'rgba(100, 6, 20, ' },
    { id: 6, title: 'Beacons',          name: 'Beacons Available',          color: 'rgba(146, 69, 161, '},
    { id: 7, title: 'Grandview',        name: 'Grandview Available',        color: 'rgba(228, 110, 76, ' },
    { id: 8, title: 'Ponto',            name: 'Ponto Available',            color: 'rgba(212, 70, 49, ' }
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
        title={item.name + ": " + moment(item.start_time).format('MM/DD/YYYY') + " - " + moment(item.end_time).format('MM/DD/YYYY') }
        {...getItemProps({
          style: {
            backgroundColor,
            color: item.color,
            border: "1px solid " + borderColor,
            borderRadius: 4,
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

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const timeStart = moment(date).valueOf()
  const timeEnd = moment(date).add(1, isMobile ? 'week' : 'month').valueOf()

  return (
    <div className="App">
      <div id="hideme">
        <FullCalendar
          plugins={[ listPlugin, googleCalendarPlugin ]}
          googleCalendarApiKey = 'TODO:APIKEY'
          initialView='list'
          duration={createDuration({ days: 730 })}
          eventSources={[
            {
              googleCalendarId: 'ufri8h0ma7fgst5tq6oprb7igc@group.calendar.google.com',
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
              googleCalendarId: 'c14qpbkomnhi19v6lqqchiv0rg@group.calendar.google.com',
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
            {
              googleCalendarId: 'fftddelp8co429b18gou8l9bng@group.calendar.google.com',
              success: function(data) {
                if (!g5) {
                  setG5(true)
                  setItems(prev => {
                    return [...prev, ...data.map(eventToEvent)];
                  })
                }
              },
            },
            {
              googleCalendarId: 'd3693e37903f276e1b656e18f3c09cb06edc6aafa554f17a3741d008dfec2431@group.calendar.google.com',
              success: function(data) {
                if (!g6) {
                  setG6(true)
                  setItems(prev => {
                    return [...prev, ...data.map(eventToEvent)];
                  })
                }
              },
            },
            {
              googleCalendarId: 'bu574phdrhm4pbrja4no3gdqvc@group.calendar.google.com',
              success: function(data) {
                if (!g7) {
                  setG7(true)
                  setItems(prev => {
                    return [...prev, ...data.map(eventToEvent)];
                  })
                }
              },
            },
            {
              googleCalendarId: '6abff5bf58fa65d9337ca7101d99a65d491c4210664f95ed018f74aff30b0c1b@group.calendar.google.com',
              success: function(data) {
                if (!g8) {
                  setG8(true)
                  setItems(prev => {
                    return [...prev, ...data.map(eventToEvent)];
                  })
                }
              },
            },
          ]}
        />
      </div>
      <div className='picker-parent'>
        <div className='picker'>
          <div style={{flexShrink:0}}>Jump to date: </div> 
          <DatePicker
            selected={date}
            onSelect={handleDatePick}
            onChange={handleDateChange}
            placeholderText='Jump to date'
            popperPlacement={"auto"}
            popperClassName={"custom-popper"}/>
        </div>
      </div>
      <div>
        <Timeline 
          groups={groups} 
          items={items}
          visibleTimeStart={timeStart}
          visibleTimeEnd={timeEnd}
          itemRenderer={itemRenderer}
          sidebarWidth={convertRemToPixels(10)} />
      </div>
    </div>
  );

  function handleDatePick(date: Date) {
    setDate(date)
  }

  function handleDateChange(date: Date) {
  }

  function convertRemToPixels(rem: number) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

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
      name: event.title,
    }
  }

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

}

export default App;
