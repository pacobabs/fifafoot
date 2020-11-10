import React, { Fragment } from 'react'
import Image from '@components/common/image'
import { Standing } from '@services/types'

type Props = {
  standings: Standing[]
  hidden: boolean
}

const Standings = ({ standings, hidden }: Props) => {
  if (standings.length === 0) {
    return (
      <div className={`match ${hidden ? 'hidden' : ''}`}>
        <div className="info">Standings are not available.</div>
      </div>
    )
  }
  return (
    <div className={`match ${hidden ? 'hidden' : ''}`}>
      <div>
        <p>STANDINGS</p>
      </div>
      <div className="standings">
        <p>
          <span></span>
          <span>Club</span>
          <span></span>
          <span>MP</span>
          <span>W</span>
          <span>D</span>
          <span>L</span>
          <span>GF</span>
          <span>GA</span>
          <span>GD</span>
          <span>Pts</span>
        </p>
      </div>
      <hr />
      {standings.map(({ Position, Points, Played, Won, Drawn, Lost, For, Against, Team }) => (
        <Fragment key={Team.IdTeam}>
          <div className="standings">
            <p>
              <span>{Position}</span>
              <span>
                <Image
                  className="inline-logo"
                  src={`https://api.fifa.com/api/v1/picture/teams-sq-3/${Team.IdTeam}`}
                  fallbackSrc="/images/football-club.svg"
                />
                {Team.Name[0].Description}
              </span>
              <span>{Played}</span>
              <span>{Won}</span>
              <span>{Drawn}</span>
              <span>{Lost}</span>
              <span>{For}</span>
              <span>{Against}</span>
              <span>{For - Against}</span>
              <span>{Points}</span>
            </p>
          </div>{' '}
          <hr />
        </Fragment>
      ))}
    </div>
  )
}
export default Standings
