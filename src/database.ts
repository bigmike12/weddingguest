export const guestList = [
  { name: "John Doe", number: "12345", type: "Single" },
  { name: "Jane Smith", number: "54321", type: "Plus One +1" },
  { name: "Tola Afonja", number: "67890", type: "Group +10" },
];

// const openModal = useModalStore((state) => state.openModal);

// const [data, setData] = useState("");

// const handleSearch = () => {
//   const guest = guestList.find((guest) =>
//     guest.name.toLowerCase().includes(data.toLowerCase())
//   );

//   if (guest) {
//     openModal(
//       "",
//       <Success
//         type="success"
//         title="Welcome!"
//         text={
//           <>
//             Hello {guest.name}, enjoy the party! <b>{guest.type}</b>
//           </>
//         }
//       />,
//       "658px"
//     );
//     onSuccess(); // Call the onSuccess callback
//   } else {
//     onSuccess(guestIdentifier); // Call the onSuccess callback with guest identifier
//   }
// };


// const [showScanner, setShowScanner] = useState(false);
// const handleScan = (guestIdentifier: string) => {
//   if (admittedGuests.has(guestIdentifier)) {
//     toast.error("This guest has already been admitted.");
//   } else {
//     onSuccess(guestIdentifier); // Call the onSuccess callback with guest identifier
//   }
// };