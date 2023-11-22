function CheckoutWizard({ activeStep = 0 }) {
  const titles = [
    'User Login',
    'Address',
    'Payment Method',
    'Place Order'
]

return (
  <div className="mb-5 flex flex-wrap">
    {titles.map((item, index) => (
        <div className={`flex-1 border-b-2 text-center ${index <= activeStep ? 'border-orange-400 text-orange-400' : 'border-gray-200 text-gray-200'}`} key={item}>{item}</div>
    ))}
  </div>
  )
}

export default CheckoutWizard