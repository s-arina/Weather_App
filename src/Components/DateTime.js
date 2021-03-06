import React from 'react';

function DateTime({ date }) {
  return (
    <div className='date'>
      {date && (
        <h2>
          {new Date()
            .toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
            .replace(/^(?:00:)?0?/, '')}
        </h2>
      )}
    </div>
  );
}

export default DateTime;
