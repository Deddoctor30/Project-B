import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = (props) => (
   <ContentLoader
      speed={1}
      width={1170}
      height={200}
      viewBox="0 0 1170 84"
      // backgroundColor="#f6f6ef"
      // foregroundColor="#e8e8e3"
      {...props}
   >
      <rect x="9" y="4" rx="0" ry="0" width="1170" height="50" />
      <rect x="18" y="14" rx="0" ry="0" width="303" height="6" />
      <rect x="11" y="33" rx="0" ry="0" width="108" height="13" />
      <rect x="129" y="33" rx="0" ry="0" width="60" height="13" />
      <rect x="196" y="33" rx="0" ry="0" width="60" height="13" />
 </ContentLoader>
 )

 

export default Skeleton