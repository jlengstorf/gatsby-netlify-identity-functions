import React, { useState } from "react"

const HighFives = () => {
  // 1. Read all the high fives
  // 2. Add new high fives
  const HIGH_FIVES_QUERY = `
    query {
      allHighFives {
        count
      }
    }
  `

  const HIGH_FIVES_MUTATION = `
    mutation($count: Int!) {
      createHighFive(data: {
        count: $count
      }) {
        count
      }
    }
  `

  const [count, setCount] = useState(0)

  const getHighFives = async () => {
    // send query
    const result = await fetch("/.netlify/functions/high-fives", {
      method: "post",
      body: JSON.stringify({
        operationName: null,
        variables: { count: 999 },
        query: HIGH_FIVES_MUTATION,
      }),
    }).then(res => res.json())
    console.log(result)
    const newCount = result.data.createHighFive.count

    setCount(newCount)
  }

  return (
    <ul>
      <li>
        Count: {count} <button onClick={getHighFives}>Update Count</button>
      </li>
    </ul>
  )
}

export default HighFives
