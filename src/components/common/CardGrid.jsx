import React from 'react';

export default function CardGrid({items, onNoItem, children}) {
  return (
	  <section className="card-grid">
		  {!items || !items.length && onNoItem}
		  {items && !!items.length && children}
	  </section>
  )
}
