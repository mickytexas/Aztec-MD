      const getContact = async (jid, dsan) => {
      
      const contact = await dsan.contactDB.get(jid);
  
    
      const username = contact?.name ?? 'User';
  
      return { username, jid };
      };
  
      const saveContacts = async (contacts, dsan) => {
      await Promise.all(
      contacts.map(async (contact) => {
      if (contact.id) {
      await dsan.contactDB.set(contact.id, contact.notify ?? '');
        }
        })
        );
        };
  
  module.exports = {
    saveContacts,
    getContact,
    };
