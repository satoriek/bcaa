async function assignEvent(eventId, loggedInUser) {
    console.log('Assigning event:', eventId, 'to user:', loggedInUser.id);
    try {
      const response = await fetch(`http://localhost:3000/event/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId, loggedInUser })
      });
      
      if (!response.ok) {
        throw new Error('Failed to assign event');
      }
  
      console.log('Event assigned successfully');
      // Handle any further actions after successful assignment
    } catch (error) {
      console.error('Error assigning event:', error.message);
      // Handle error appropriately, e.g., show error message to user
    }
}
export default assignEvent;