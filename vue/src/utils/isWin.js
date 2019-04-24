export default function isWin(map, row, column) {
	let r = row,
		c = column,
		rowLength = map.length,
		columnLength = map[0].length,
		currentPoint = map[r][c]
		function judgeLeftDown2RightTop(r, c, currentPoint) {
			if(c+1 < columnLength && c+2 < columnLength && c+3 < columnLength && c+4 < columnLength 
				&& r-1 >= 0 && r-2 >= 0 && r-3 >= 0 && r-4 >= 0) {
				if(map[r-1][c+1] == currentPoint && map[r-2][c+2] == currentPoint && map[r-3][c+3] == currentPoint && map[r-4][c+4] == currentPoint) {
					return true
				}
			}
			if(c-1 >= 0 && c-2 >= 0 && c-3 >= 0 && c-4 >= 0 && r+1 < rowLength && r+2 < rowLength && r+3 < rowLength && r+4 < rowLength) {
				if(map[r+1][c-1] == currentPoint && map[r+2][c-2] == currentPoint && map[r+3][c-3] == currentPoint && map[r+4][c-4] == currentPoint) {
					return true
				}
			}
			if(c-1 >= 0 && c+1 < columnLength && c+2 < columnLength && c+3 < columnLength
				&& r-1 >= 0 && r+1 < rowLength && r+2 < rowLength && r+3 < rowLength) {
				if(map[r-1][c+1] == currentPoint && map[r-2][c+2] == currentPoint && map[r-3][c+3] == currentPoint && map[r+1][c-1] == currentPoint) {
					return true
				}
			}
			if(c-1 >= 0 && c-2 >= 0 && c+1 < columnLength && c+2 < columnLength  
				&& r-1 >= 0 && r-2 >= 0 && r+1 < rowLength && r+2 < rowLength) {
				if(map[r-1][c+1] == currentPoint && map[r-2][c+2] == currentPoint && map[r+1][c-1] == currentPoint && map[r+2][c-2] == currentPoint) {
					return true
				}
			}
			if(c-1 >= 0 && c-2 >= 0 && c-3 >= 0 && c+1 < columnLength
				&& r-1 >= 0 && r-2 >= 0 && r-3 >= 0 && r+1 < rowLength) {
					if(map[r+1][c-1] == currentPoint && map[r+2][c-2] == currentPoint && map[r+3][c-3] == currentPoint && map[r-1][c+1] == currentPoint) {
						return true
					}
				}
		}
		function judgeLeftTop2RightDown(r, c, currentPoint) {
			if(c+1 < columnLength && c+2 < columnLength && c+3 < columnLength && c+4 < columnLength 
				&& r+1 < rowLength && r+2 < rowLength && r+3 < rowLength && r+4 < rowLength) {
				if(map[r+1][c+1] == currentPoint && map[r+2][c+2] == currentPoint && map[r+3][c+3] == currentPoint && map[r+4][c+4] == currentPoint) {
					return true
				}
			}
			if(c-1 >= 0 && c-2 >= 0 && c-3 >= 0 && c-4 >= 0 && r-1 >= 0 && r-2 >= 0 && r-3 >= 0 && r-4 >= 0) {
				if(map[r-1][c-1] == currentPoint && map[r-2][c-2] == currentPoint && map[r-3][c-3] == currentPoint && map[r-4][c-4] == currentPoint) {
					return true
				}
			}
			if(c-1 >= 0 && c+1 < columnLength && c+2 < columnLength && c+3 < columnLength
				&& r-1 >= 0 && r+1 < rowLength && r+2 < rowLength && r+3 < rowLength) {
				if(map[r-1][c-1] == currentPoint && map[r+1][c+1] == currentPoint && map[r+2][c+2] == currentPoint && map[r+3][c+3] == currentPoint) {
					return true
				}
			}
			if(c-1 >= 0 && c-2 >= 0 && c+1 < columnLength && c+2 < columnLength  
				&& r-1 >= 0 && r-2 >= 0 && r+1 < rowLength && r+2 < rowLength) {
				if(map[r-1][c-1] == currentPoint && map[r-2][c-2] == currentPoint && map[r+1][c+1] == currentPoint && map[r+2][c+2] == currentPoint) {
					return true
				}
			}
			if(c-1 >= 0 && c-2 >= 0 && c-3 >= 0 && c+1 < columnLength
				&& r-1 >= 0 && r-2 >= 0 && r-3 >= 0 && r+1 < rowLength) {
					if(map[r-1][c-1] == currentPoint && map[r-2][c-2] == currentPoint && map[r-3][c-3] == currentPoint && map[r+1][c+1] == currentPoint) {
						return true
					}
				}
		}
		function judgeRow(r, c, currentPoint) {
			if(c+1 < columnLength && c+2 < columnLength && c+3 < columnLength && c+4 < columnLength) {
				if(map[r][c+1] == currentPoint && map[r][c+2] == currentPoint && map[r][c+3] == currentPoint && map[r][c+4] == currentPoint) {
					return true
				}
			}
			if(c-1 >= 0 && c-2 >= 0 && c-3 >= 0 && c-4 >= 0) {
				if(map[r][c-1] == currentPoint && map[r][c-2] == currentPoint && map[r][c-3] == currentPoint && map[r][c-4] == currentPoint) {
					return true
				}
			}
			if(c-1 >= 0 && c+1 < columnLength && c+2 < columnLength && c+3 < columnLength) {
				if(map[r][c-1] == currentPoint && map[r][c+1] == currentPoint && map[r][c+2] == currentPoint && map[r][c+3] == currentPoint) {
					return true
				}
			}
			if(c-1 >= 0 && c-2 >= 0 && c+1 < columnLength && c+2 < columnLength) {
				if(map[r][c-1] == currentPoint && map[r][c-2] == currentPoint && map[r][c+1] == currentPoint && map[r][c+2] == currentPoint) {
					return true
				}
			}
			if(c-1 >= 0 && c-2 >= 0 && c-3 >= 0 && c+1 < columnLength) {
				if(map[r][c-1] == currentPoint && map[r][c-2] == currentPoint && map[r][c-3] == currentPoint && map[r][c+1] == currentPoint) {
					return true
				}
			}
		}
		function judgeCol(r, c, currentPoint) {
			if(r+1 < rowLength && r+2 < rowLength && r+3 < rowLength && r+4 < rowLength) {
				if(map[r+1][c] == currentPoint && map[r+2][c] == currentPoint && map[r+3][c] == currentPoint && map[r+4][c] == currentPoint) {
					return true
				}
			}
			if(r-1 >= 0 && r-2 >= 0 && r-3 >= 0 && r-4 >= 0) {
				if(map[r-1][c] == currentPoint && map[r-2][c] == currentPoint && map[r-3][c] == currentPoint && map[r-4][c] == currentPoint) {
					return true
				}
			}
			if(r-1 >= 0 && r+1 < rowLength && r+2 < rowLength && r+3 < rowLength) {
				if(map[r-1][c] == currentPoint && map[r+1][c] == currentPoint && map[r+2][c] == currentPoint && map[r+3][c] == currentPoint) {
					return true
				}
			}
			if(r-1 >= 0 && r-2 >= 0 && r+1 < rowLength && r+2 < rowLength) {
				if(map[r-1][c] == currentPoint && map[r-2][c] == currentPoint && map[r+1][c] == currentPoint && map[r+2][c] == currentPoint) {
					return true
				}
			}
			if(r-1 >= 0 && r-2 >= 0 && r-3 >= 0 && r+1 < rowLength) {
				if(map[r-1][c] == currentPoint && map[r-2][c] == currentPoint && map[r-3][c] == currentPoint && map[r+1][c] == currentPoint) {
					return true
				}
			}
		}
		if(judgeLeftTop2RightDown(r, c, currentPoint)) {
			return true
		}
		if(judgeLeftDown2RightTop(r, c, currentPoint)) {
			return true
		}
		if(judgeRow(r, c, currentPoint)) {
			return true
		}
		if(judgeCol(r, c, currentPoint)) {
			return true
		}
		return false
}
