import React, { useState } from 'react';

export default () => {
  const [aggregate, setAggregate] = useState([
    { id: 'a', name: 'A' },
    { id: 'b', name: 'B' },
    { id: 'c', name: 'C' },
  ]);
  const [targets, setTargets] = useState([]);
  const [destination, setDestination] = useState(null);
  
  const onDragEnd = (e) => {
    console.log('onDragEnd begin');

    console.log(e.target);
    const t = aggregate.filter(v => v.id === e.target.id);
    console.log(t);
    setTargets(t);
    
    // Use t because {targets} is async.
    let a = aggregate.filter((v) => {
      if (!t.find(aggregatee => aggregatee.id == v.id)) {
        return v;
      }
    });
    console.log(a);
    
    const index = a.findIndex(item => item.id === destination.id);
//    a.splice(index + 1, 0, t);
    const head = a.slice(0, index + 1);
    const tail = a.slice(index + 1);
    let reply;
//    if (aggregate.findIndex(item => item.id === e.target.id) === 0) {
//    if (aggregate.findIndex(item => item.id === e.target.id) < aggregate.findIndex(item => item.id === destination.id)) {
      reply = head.concat(t);
      reply = reply.concat(tail);
//    } else {
//      reply = t.concat(head);
//      reply = reply.concat(tail);
//    }
    console.log(reply);
    setAggregate(reply);

    console.log('onDragEnd end');
  }

  const onDrop = (e) => {
    e.preventDefault();
    console.log('onDrop begin');
    console.log(e.target);
    setDestination(e.target);
    console.log('onDrop end');
  }
  
  return (
    <div>
    {
      aggregate.map((v) => {
        return (
          <div id={ v.id } style={{ border: '1px solid black' }} onDragOver={ (e) => { e.preventDefault(); } } onDragEnd={ (e) => { onDragEnd(e); } } onDrop={ (e) => { onDrop(e); } } draggable='true' >
            { v.name }
          </div>
        )
      })
    }
    </div>
  );
}