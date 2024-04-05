import { SystemContext } from './SystemContext.js'
import { useContext } from 'react'

// Functions used to mimic database information, this would need to be provided from an actual backend, and the data
// propagation would be slightly different

export function getTemperature (isHistorical) {
  const systemStatus = useContext(SystemContext)
  const lowTemp = [
    22, 21, 15, 24, 21, 20, 17, 22, 18, 22,
    15, 25, 19, 22, 21, 20, 24, 19, 21, 21,
    24, 22, 16, 15, 15, 25, 22, 15, 20,
  ]
  const highTemp = [
    23, 27, 23, 22, 21, 30, 27, 25, 28, 20,
    25, 30, 28, 30, 20, 24, 20, 26, 20, 22,
    29, 22, 29, 27, 25, 22, 29, 26, 27, 26,
  ]

  return isHistorical || systemStatus.heating ? highTemp : lowTemp
}

export function getCO2 (isHistorical) {
  const systemStatus = useContext(SystemContext)
  const highCo2 = [
    916, 828, 987, 1019, 818, 1128, 1030, 1076, 1116, 1041,
    1017, 940, 803, 814, 1154, 1180, 1165, 1162, 1155, 1019,
    886, 1196, 816, 883, 1147, 814, 912, 1037, 1064, 814,
  ]
  const lowCo2 = [
    721, 456, 799, 922, 559, 891, 810, 734, 821, 955,
    768, 941, 460, 567, 604, 472, 562, 596, 480, 706,
    719, 418, 721, 611, 691, 610, 683, 746, 973, 634,
  ]

  return isHistorical || systemStatus.ventilation ? highCo2 : lowCo2
}

export function getHumidity () {
  const systemStatus = useContext(SystemContext)
  return [
    78, 70, 70, 82, 73, 64, 71, 83, 61, 62,
    70, 75, 78, 87, 76, 67, 73, 65, 85, 60,
    80, 64, 76, 67, 69, 76, 61, 81, 69, 64,
  ]
}

export function getAirflow (isHistorical) {
  const systemStatus = useContext(SystemContext)
  const lowAirflow = [
    6, 8, 6, 8, 5, 6, 8, 7, 8, 8,
    6, 7, 7, 6, 7, 8, 6, 7, 5, 7,
    6, 8, 7, 7, 7, 5, 8, 7, 5, 5,
  ]

  const highAirflow = [
    10, 9, 9, 12, 8, 11, 8, 11, 10, 12,
    12, 8, 11, 8, 11, 12, 11, 9, 10, 9,
    9, 8, 11, 8, 12, 9, 8, 12, 11, 12,
  ]

  return isHistorical || systemStatus.ventilation ? highAirflow : lowAirflow
}

export function getPower (isHistorical) {
  const systemStatus = useContext(SystemContext)
  const highPower = [
    51, 48, 40, 37, 55, 34, 59, 42, 42, 30,
    35, 42, 46, 36, 46, 45, 31, 46, 49, 47,
    33, 59, 44, 30, 45, 42, 55, 50, 46, 32,
  ]
  const lowPower = [
    34, 32, 37, 23, 18, 19, 26, 23, 18, 28,
    15, 23, 23, 33, 38, 40, 29, 34, 18, 32,
    22, 28, 20, 35, 23, 36, 29, 39, 28, 32,
  ]

  if (isHistorical || systemStatus.ventilation && systemStatus.heating) return highPower
  return lowPower
}

export function getHappiness (isHistorical) {
  const systemStatus = useContext(SystemContext)
  const highHappiness = [
    73, 75, 70, 68, 80, 78, 60, 80, 61, 63,
    66, 80, 78, 63, 66, 70, 66, 68, 71, 72,
    63, 66, 75, 76, 68, 70, 73, 72, 73, 63,
  ]
  const normalHappiness = [
    49, 50, 52, 59, 41, 54, 44, 47, 51, 54,
    57, 54, 59, 46, 40, 55, 48, 52, 56, 41,
    53, 41, 42, 49, 51, 48, 52, 54, 45, 60,
  ]
  const lowHappiness = [
    26, 37, 40, 34, 30, 30, 10, 38, 17, 39,
    34, 19, 27, 11, 25, 10, 27, 38, 20, 15,
    24, 32, 11, 14, 23, 18, 21, 35, 12, 33,
  ]

  if (systemStatus.warning) return lowHappiness
  if (systemStatus.ventilation && systemStatus.heating) return highHappiness
  return normalHappiness
}